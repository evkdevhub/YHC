import { useEffect, useState } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import NotFound from "@/pages/not-found";
import Preloader from "@/components/preloader";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [showPreloader, setShowPreloader] = useState(false);
  const [preloaderVisible, setPreloaderVisible] = useState(true);

  useEffect(() => {
    // Восстанавливаем scroll-позицию при загрузке страницы
    const savedScroll = sessionStorage.getItem("scrollPos");
    if (savedScroll) {
      window.scrollTo({ top: parseInt(savedScroll), behavior: "auto" });
    }

    // Сохраняем scroll-позицию при уходе со страницы/обновлении
    const saveScroll = () => {
      sessionStorage.setItem("scrollPos", window.scrollY.toString());
    };
    window.addEventListener("beforeunload", saveScroll);

    // Показываем прелоадер только если загрузка дольше 500 мс
    const delayTimer = setTimeout(() => {
      setShowPreloader(true);
    }, 500);

    // Скрываем прелоадер, когда страница полностью загрузилась
    const onLoad = () => {
      clearTimeout(delayTimer);
      setPreloaderVisible(false);
    };

    if (document.readyState === "complete") {
      onLoad();
    } else {
      window.addEventListener("load", onLoad);
    }

    return () => {
      window.removeEventListener("beforeunload", saveScroll);
      window.removeEventListener("load", onLoad);
      clearTimeout(delayTimer);
    };
  }, []);

  // Если прелоадер не должен показываться или уже скрыт — показываем основной контент
  if (!showPreloader || !preloaderVisible) {
    return (
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </QueryClientProvider>
    );
  }

  // Иначе показываем прелоадер
  return <Preloader fadeOut={!preloaderVisible} />;
}

export default App;
