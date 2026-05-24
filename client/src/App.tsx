import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Parceiro from "./pages/Parceiro";
import Perfil from "./pages/Perfil";
import Ofertas from "./pages/Ofertas";
import FazerPedido from "./pages/FazerPedido";
function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path={"\\"} component={Home} />
      <Route path={"/parceiro"} component={Parceiro} />
      <Route path={"/perfil"} component={Perfil} />
      <Route path={"/ofertas"} component={Ofertas} />
      <Route path={"/fazer-pedido"} component={FazerPedido} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
