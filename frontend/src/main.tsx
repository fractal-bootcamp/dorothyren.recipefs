import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

// Import your publishable key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

// Import the layouts
import RootLayout from './layouts/root-layout'

// Import components
import IndexPage from './routes'
import SignInPage from './routes/SignIn'
import SignUpPage from './routes/SignUp'
import RecipeFeedPage from './routes/RecipeFeed'
import CreateRecipePage from './routes/CreateRecipe'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: "/", element: <IndexPage /> },
      { path: "/sign-in", element: <SignInPage /> },
      { path: "/sign-up", element: <SignUpPage /> },
      { path: "/recipefeed", element: <RecipeFeedPage /> },
      { path: "/createrecipe", element: <CreateRecipePage /> },
    ]
  }
])


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)


// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import './index.css'
// import { RouterProvider, createBrowserRouter } from 'react-router-dom'

// // Import the layouts
// import RootLayout from './layouts/root-layout'
// import DashboardLayout from './layouts/dashboard-layout'

// // Import the components
// import IndexPage from './routes'
// import SignInPage from './routes/SignIn'
// import SignUpPage from './routes/SignUp'
// import DashboardPage from './routes/dashboard'
// import InvoicesPage from './routes/dashboard.invoices'

// const router = createBrowserRouter([
//   {
//     element: <RootLayout />,
//     children: [
//       { path: "/", element: <IndexPage /> },
//       { path: "/sign-in/*", element: <SignInPage /> },
//       { path: "/sign-up/*", element: <SignUpPage /> },
//       { path: "/createrecipe", element: <DashboardPage /> },
//       { path: "/dashboard/invoices", element: <InvoicesPage /> }
//       {
//         element: <DashboardLayout />,
//         path: "dashboard",
//         children: [
//           { path: "/dashboard", element: <DashboardPage /> },
//           { path: "/dashboard/invoices", element: <InvoicesPage /> }
//         ]
//       }
//     ]
//   }
// ])

// ReactDOM.createRoot(document.getElementById('root')!).render(
//   <React.StrictMode>
//     <RouterProvider router={router} />
//   </React.StrictMode>,
// )