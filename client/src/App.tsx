import { Switch, Route } from "wouter";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Features from "@/pages/features";
import Partners from "@/pages/partners";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { useTheme } from "./lib/ThemeContext";
import { useEffect } from "react";
import { cn } from "./lib/utils";

function App() {
  const { theme } = useTheme();
  
  useEffect(() => {
    // Apply theme class to document body
    document.body.classList.remove('light-mode', 'dark-mode');
    document.body.classList.add(`${theme}-mode`);
  }, [theme]);

  return (
    <div className={cn(
      "min-h-screen flex flex-col transition-colors duration-300",
      theme === 'dark' ? "bg-black" : "bg-white"
    )}>
      <Header />
      <main className="flex-grow">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/features" component={Features} />
          <Route path="/partners" component={Partners} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

export default App;
