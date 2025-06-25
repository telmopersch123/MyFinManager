"use client";
import { UserButton } from "@clerk/nextjs";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Loading from "../(home)/_components/loading";

// Hook personalizado para exibir loading durante a navegação
export function useRouteLoading(delay: number = 500) {
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const initialPath = useRef(pathname);

  const handleLoading = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    initialPath.current = pathname;

    setTimeout(() => {
      if (initialPath.current === pathname) setLoading(true);
    }, delay);
    router.push(href);
  };
  return { isLoading, handleLoading, setLoading };
}

const Navbar = () => {
  const pathname = usePathname();
  const { isLoading, handleLoading } = useRouteLoading();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const hightlightRef = useRef<HTMLSpanElement>(null);
  const [activeLink, setActiveLink] = useState<string>(pathname);
  const [enabled, setEnabled] = useState<boolean | undefined>(undefined); // Permite undefined inicialmente
  const [isMounted, setIsMounted] = useState(false); // Controla renderização

  // Inicializa o tema apenas no lado do cliente
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme");
      setEnabled(savedTheme === "light");
      setIsMounted(true);
    }
  }, []);

  // Alternar menu mobile
  const toggleMenu = () => setMenuOpen(!isMenuOpen);

  // Atualiza a posição do destaque com base no link ativo ou hover
  const updateHightligh = (target: HTMLElement) => {
    if (!hightlightRef.current || !navRef.current || !target) return;
    const rect = target.getBoundingClientRect();
    const navRect = navRef.current.getBoundingClientRect();
    hightlightRef.current.style.width = `${rect.width}px`;
    hightlightRef.current.style.left = `${rect.left - navRect.left}px`;
    hightlightRef.current.style.top = `${rect.top - navRect.top}px`;
    hightlightRef.current.style.height = `${rect.height}px`;
  };

  // Atualiza destaque ao carregar a rota e ao redimensionar a tela
  useEffect(() => {
    const activeElement = navRef.current?.querySelector(
      `a[href="${pathname}"]`,
    ) as HTMLAnchorElement;
    updateHightligh(activeElement);

    const handleResize = () => {
      const activeElement = navRef.current?.querySelector(
        `a[href="${pathname}"]`,
      ) as HTMLAnchorElement;
      updateHightligh(activeElement);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [pathname]);

  // Manipula o clique nos links: ativa destaque e inicia loading
  const handleLinkInteraction = (href: string, e: React.MouseEvent) => {
    if (pathname === href) return;
    setActiveLink(href);
    updateHightligh(e.currentTarget as HTMLAnchorElement);
    handleLoading(href)(e);
  };

  // Destaca item ao passar o mouse
  const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    updateHightligh(e.currentTarget as HTMLAnchorElement);
  };

  // Restaura o destaque ao item ativo ao tirar o mouse
  const handleMouseLeave = () => {
    const activeElement = navRef.current?.querySelector(
      `a[href="${activeLink}"]`,
    ) as HTMLAnchorElement;
    updateHightligh(activeElement);
  };

  // Aplica o tema escuro por padrão e alterna para claro quando enabled for true
  useEffect(() => {
    if (typeof window !== "undefined" && isMounted) {
      if (!enabled) {
        document.body.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.body.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
    }
  }, [enabled, isMounted]);

  useEffect(() => {
    const handleBefore = () => {
      localStorage.removeItem("theme");
    };

    window.addEventListener("beforeunload", handleBefore);
    return () => {
      window.removeEventListener("beforeunload", handleBefore);
    };
  }, []);

  return (
    <>
      {isLoading && <Loading />}
      <nav className="not-dark:shadow-sm not-dark:rounded-b-lg relative flex w-full items-center justify-between border-b border-border bg-background px-4 py-3 text-foreground sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <Image
            src="/logo.png"
            width={150}
            height={34}
            alt="MyFinManager"
            className="h-6 w-auto sm:h-7 lg:h-8"
          />
          <span className="text-[3vw] font-semibold tracking-tight text-[hsl(var(--foreground))] sm:inline-block sm:text-sm md:text-base lg:text-lg">
            MyFinManager
          </span>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="rounded-lg bg-white/10 p-1 text-foreground transition-colors duration-200 hover:text-primary focus:outline-none lg:hidden"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Navigation Links */}
        <div
          ref={navRef}
          className={`${
            isMenuOpen ? "flex" : "hidden"
          } not-dark:shadow-md absolute left-0 top-20 z-10 w-full flex-col rounded-bl-lg rounded-br-lg border border-border bg-background lg:static lg:flex lg:w-auto lg:flex-row lg:items-center lg:gap-6 lg:rounded-none lg:border-none lg:bg-transparent lg:shadow-none`}
        >
          <div className="relative flex w-full flex-col items-start lg:flex-row lg:items-center lg:gap-6">
            {[
              { href: "/", label: "Dashboard" },
              { href: "/transactions", label: "Transações" },
              { href: "/investiment", label: "Investimentos" },
              { href: "/subscription", label: "Assinatura" },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={(e) => handleLinkInteraction(href, e)}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onFocus={(e) =>
                  updateHightligh(e.currentTarget as HTMLAnchorElement)
                }
                aria-current={pathname === href ? "page" : undefined}
                className={`relative z-10 block px-4 py-2 text-sm font-medium transition-colors duration-200 lg:px-3 lg:py-1 ${
                  pathname === href
                    ? "not-dark:bg-primary/10 not-dark:rounded-md text-primary"
                    : "not-dark:hover:bg-muted/10 not-dark:rounded-md text-foreground hover:text-primary"
                }`}
              >
                {label}
              </Link>
            ))}

            <span
              ref={hightlightRef}
              className="absolute hidden border-b-2 border-primary text-primary transition-all duration-300 ease-out lg:block"
              style={{ willChange: "width, left, top, height" }}
            ></span>
          </div>
        </div>

        {/* User Button */}
        <div className="flex flex-col-reverse items-end justify-end gap-1 rounded-md p-1 sm:flex-row sm:items-center sm:bg-black/10 sm:px-3 sm:py-2 sm:dark:bg-white/5">
          {isMounted && (
            <div className="flex items-center justify-center rounded-md bg-black/10 p-1 dark:bg-white/5 sm:p-2">
              <button
                onClick={() => setEnabled(!enabled)}
                className={`relative inline-flex h-5 w-10 items-center rounded-full transition-colors duration-300 sm:h-6 sm:w-12 ${
                  enabled === true ? "bg-primary" : "bg-black/50"
                } not-dark:ring-1 not-dark:ring-primary/20`}
                aria-label="Alternar tema"
              >
                <span
                  className={`toggle-icon flex h-4 w-4 transform items-center justify-center rounded-full bg-white text-xs transition-transform duration-300 sm:h-5 sm:w-5 ${
                    enabled
                      ? "translate-x-5 sm:!translate-x-6"
                      : "!translate-x-1"
                  }`}
                ></span>
              </button>
            </div>
          )}
          <UserButton
            showName
            appearance={{
              elements: {
                userButtonBox: {
                  color: enabled ? "#000000 !important" : "#ffffff ",
                  fontSize: "14px", // Tamanho base da fonte
                  "@media (max-width: 640px)": {
                    fontSize: "12px", // Menor em telas pequenas
                    borderRadius: "8px",
                    padding: "2px",
                    background: enabled ? "#0000001A" : "#ffffff1A",
                  },
                },
                userButtonPopoverUserName: {
                  color: enabled ? "#000000 !important" : "#ffffff ",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  maxWidth: "100px", // Limita a largura do nome
                  "@media (min-width: 640px)": {
                    maxWidth: "150px", // Maior largura em telas maiores
                  },
                },
              },
            }}
          />
        </div>
      </nav>
    </>
  );
};

Navbar.displayName = "Navbar";

export default Navbar;
