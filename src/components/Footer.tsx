import { NavLink } from "react-router-dom";
import { footerNavs } from "../utils/data";
import Newsletter from "./Newsletter";

const Footer = () => {
  return (
    <section className="w-full shadow-lg bg-black/70 text-white px-4 py-10 lg:px-[5rem] lg:py-[5rem]">
      <section className="grid place-items-stretch grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-10 font-semibold">
        <section className="lg:row-start-1 lg:col-start-1 lg:col-span-6 mb-4 lg:mb-0">
          <Newsletter />
        </section>

        {footerNavs.map((nav) => (
          <section key={nav.id} className="lg:row-start-1 lg:col-span-2">
            <h4 className="text-base font-semibold mb-4">{nav.header}</h4>
            <ul className="text-sm font-normal">
              {nav.menu.map((menuItem) => (
                <NavLink
                  key={menuItem.id}
                  to={menuItem.path}
                  className={({ isActive, isPending }) =>
                    isPending
                      ? "inline-flex flex-col items-center"
                      : isActive
                      ? "text-white font-bold underline"
                      : "hover:underline hover:font-bold"
                  }
                >
                  <li className="mb-3">{menuItem.label}</li>
                </NavLink>
              ))}
            </ul>
          </section>
        ))}

        <section className="lg:row-start-2 col-span-full text-center place-self-center">
          <p className="text-base font-normal">
            © 2024. Landifi Inc. All right reserved.
          </p>
        </section>
      </section>
    </section>
  );
};

export default Footer;
