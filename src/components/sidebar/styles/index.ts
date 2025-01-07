export const styles = {
    link: "flex items-center gap-2 text-body-m text-neutral-2 hover:text-neutral-1 uppercase h-14 pl-4 relative w-full",
    selected: "bg-gradient-to-r from-[rgba(186,37,37,0)] to-[rgba(210,77,77,0.1)] text-primary-4",
    rectangle: "absolute right-0 top-0 w-1 h-14 bg-primary-4",
    sidebar: "hidden md:block w-[232px] h-[836px] bg-neutral-4 rounded-3xl relative",
    logo: "absolute w-10 h-10 top-3 left-24",
    nav: "flex flex-col pt-24",
    linkContainer: "relative w-full",
    mobileButton: "fixed top-4 left-4 z-50 text-neutral-1",
    mobileMenu: "fixed top-0 left-0 h-full w-64 bg-neutral-4 shadow-lg transform transition-transform duration-300 ease-in-out z-40",
    mobileNav: "pt-20 px-4",
    mobileLogo: "w-10 h-10 mb-8 mx-auto"
  } as const;