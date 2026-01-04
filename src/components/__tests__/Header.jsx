import { fireEvent, render, screen } from "@testing-library/react";
import Header from "../Header";
import "@testing-library/jest-dom";
import { BrowserRouter, ScrollRestoration } from "react-router-dom";
import { Provider } from "react-redux";
import appStore from "../../utils/appStore"

// fire event use to deal with Clicks
test("Check this Hearder Cart Item", () => {
  render(
    <BrowserRouter>
      <Provider store={appStore}> <Header /></Provider>
    </BrowserRouter>
  );
  const buttonlog = screen.getByRole("button", { name: "Sign In" });

  fireEvent.click(buttonlog);

  const buttonlogout = screen.getByRole("button", { name: "Sign Out" })

  expect(buttonlogout).toBeInTheDocument();
});
//Cart 🛒
test("Check the Cart Icon or Cart", () => {
  render(
    <BrowserRouter>
      <Provider store={appStore}>
        <Header />
      </Provider>
    </BrowserRouter>

  );
  const cartOption = screen.getByRole("link",{name:"cart"});
  expect(cartOption).toBeInTheDocument();


})
