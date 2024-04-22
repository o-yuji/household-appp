import React, { useState, useEffect } from 'react';
import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Home from './pages/Home';
import Report from './pages/Report';
import NoMatch from './pages/NoMatch';
import AppLayout from './components/layout/AppLayout';
import { ThemeProvider } from '@emotion/react';
import { theme } from './theme/them';
import { CssBaseline } from '@mui/material'; 
import { Transaction } from './types/index';
import { collection, getDocs, addDoc, doc, deleteDoc, updateDoc} from "firebase/firestore";
import { db } from './firebase'
import {formatMonth} from './utils/formatting'
import { Schema } from './validations/schema';

// Firestoreエラーか判別
function isFireStoreError(err: unknown):err is {code:string, message:string} {
  return typeof err === 'object' && err !== null && 'code' in err && 'message' in err;
}

function App() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [isLoading, setIsLoading] = useState(true)

  //firestoreのデータを全て取得
  useEffect(() => {
    const fetchTransactions = async() => {
      try {
        const querySnapshot = await getDocs(collection(db, "Transactions"));
        const transactionsData = querySnapshot.docs.map((doc) => {
          return {
            ...doc.data(),
            id: doc.id,
          } as Transaction
        });
        setTransactions(transactionsData)
        setIsLoading(false)
      } catch (err) {
        if (isFireStoreError(err)) {
          console.error('Firestore_error:', err)
          console.error('Firestore_error:', err.message)
          console.error('Firestore_error:', err.code)          
        } else {
          console.error('一般的なエラー:', err)
        }
      } finally {
        setIsLoading(false)
      }
    }
    fetchTransactions();
  },[])

  //1月分のデータを取得
  const monthlyTransactions = transactions.filter((transaction) => {
    return transaction.date.startsWith(formatMonth(currentMonth))
  })

  //firestoreにデータを保存
  const handleSaveTransaction = async (transaction: Schema) => {
      // console.log(transaction)
      try {
        const docRef = await addDoc(collection(db, "Transactions"), transaction);
        // console.log("Document written with ID: ", docRef.id);

        const newTransaction = {
          id: docRef.id,
          ...transaction,
        } as Transaction

        setTransactions((prevTransaction) => [...prevTransaction, newTransaction])

      } catch (err) {
        if (isFireStoreError(err)) {
          console.error('Firestore_error:', err)
          console.error('Firestore_error:', err.message)
          console.error('Firestore_error:', err.code)          
        } else {
          console.error('一般的なエラー:', err)
        }
      }
  }

  const handleDeleteTransaction = async (transactionIds: string | readonly string[]) => {
    //firestoreからデータを削除
    try {
      const idsToDelete = Array.isArray(transactionIds) ? transactionIds : [transactionIds]

      for (const id of idsToDelete) {
        await deleteDoc(doc(db, "Transactions", id));
      }
      
      const filterdTransactions = transactions.filter(
        (transaction) => !idsToDelete.includes(transaction.id)
      )
      setTransactions(filterdTransactions)

    }catch(err){
      if (isFireStoreError(err)) {
          console.error('Firestore_error:', err)
          console.error('Firestore_error:', err.message)
          console.error('Firestore_error:', err.code)
        } else {
          console.error('一般的なエラー:', err)
        }
    }
  }

  const handleUpdateTransaction = async (transaction:Schema, transactionId:string) => {
    try {
      const docRef = doc(db, "Transactions", transactionId);
      await updateDoc(docRef, transaction)
      //更新後の画面更新
      const updatedTransactions = transactions.map((t)=> t.id === transactionId ? {...t, ...transaction} : t) as Transaction[]
      setTransactions(updatedTransactions)
    } catch (err) {
        if (isFireStoreError(err)) {
          console.error('Firestore_error:', err)
          console.error('Firestore_error:', err.message)
          console.error('Firestore_error:', err.code)          
        } else {
          console.error('一般的なエラー:', err)
        }
    }
  }
    
  return (
    <ThemeProvider theme={theme}>
    <CssBaseline />
    <Router basename="/household/">
      <Routes>
        <Route path="/" element={<AppLayout />}>
            <Route
              index
              element={
                <Home
                  monthlyTransactions={monthlyTransactions}
                  setCurrentMonth={setCurrentMonth}
                  onSaveTransaction={handleSaveTransaction}
                  onDeleteTransaction={handleDeleteTransaction}
                  onUpdateTransaction={handleUpdateTransaction}
                />
              }
            />
            <Route
              path="/report"
              element={
                <Report
                  currentMonth={currentMonth}
                  setCurrentMonth={setCurrentMonth}
                  monthlyTransactions={monthlyTransactions}
                  isLoading={isLoading}
                  onDeleteTransaction={handleDeleteTransaction}
                />
              }
            />
          <Route path="*" element={<NoMatch/>} />
        </Route>
      </Routes>
    </Router>
    </ThemeProvider>
  );
}

export default App;
