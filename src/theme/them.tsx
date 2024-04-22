import { PaletteColor, createTheme, PaletteColorOptions } from "@mui/material";
import { blue, red, green, cyan, lightBlue, lightGreen, deepOrange, amber, pink, purple } from "@mui/material/colors";
import { ExpenseCategory, IncomeCategory } from "../types";

declare module "@mui/material/styles" {
    interface Palette {
        incomeColor: PaletteColor;
        expenseColor: PaletteColor;
        balanceColor: PaletteColor;
        incomeCategoryColor: Record<IncomeCategory, string>;
        expenseCategoryColor: Record<ExpenseCategory, string>;
    }

    interface PaletteOptions {
        incomeColor?: PaletteColorOptions;
        expenseColor?: PaletteColorOptions;
        balanceColor?: PaletteColorOptions;
        incomeCategoryColor?: Record<IncomeCategory, string>;
        expenseCategoryColor?: Record<ExpenseCategory, string>;
    }
}

export const theme = createTheme({
    typography: {
        fontFamily: 'Noto Sans JP, Roboto, "Helvetica Neue", Arial, sans-serif',
        fontWeightRegular: 400,
        fontWeightMedium: 500,
        fontWeightBold: 700,
    },

    palette: {
        //収入用の色を定義
        incomeColor: {
            main: blue[500],
            light: blue[100],
            dark: blue[700],
        },
        //支出用の色を定義
        expenseColor: {
            main: red[500],
            light: red[100],
            dark: red[700],
        },
        //残高用の色を定義
        balanceColor: {
            main: green[500],
            light: green[100],
            dark: green[700],
        },
        //円グラフ(収入)用の色を定義
        incomeCategoryColor : {
            給与: lightBlue[600],
            副収入: cyan[200],
            お小遣い: lightGreen["A700"],
        },
        //円グラフ(支出)用の色を定義
        expenseCategoryColor : {
            食費: deepOrange[500],
            日用品:lightGreen[500],
            住居費:amber[500],
            交際費:pink[300],
            娯楽:cyan[200],
            交通費:purple[400],
        },
    },
})