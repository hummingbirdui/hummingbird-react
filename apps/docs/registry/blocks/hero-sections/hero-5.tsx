"use client";

import { useRef, useState } from "react";
import {
  Button,
  Dropdown,
  Field,
  Input,
  InputIcon,
  Nav,
  Navbar,
  Text,
} from "@hummingbirdui/react";

const navLinks = ["Home", "Features", "Pricing", "Contact"];
const guestOptions = ["1 Person", "2 Persons", "3 Persons"];

export default function Hero5() {
  const dateRef = useRef<HTMLInputElement>(null);
  const [guests, setGuests] = useState(guestOptions[0]);

  return (
    <div className="bg-[url(https://images.unsplash.com/photo-1645033393602-4f7623917853?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] bg-no-repeat bg-cover bg-center h-screen">
      <div className="bg-linear-to-r from-black/90 to-black/20 w-full h-full absolute top-0 left-0" />
      <div className="max-w-7xl mx-auto px-6 md:px-10 h-full flex flex-col justify-between relative z-1">
        <Navbar expand="lg" className="px-0 py-5 justify-between">
          <div className="flex items-center gap-2">
            <Navbar.Toggle className="btn btn-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M4 18q-.425 0-.712-.288T3 17t.288-.712T4 16h16q.425 0 .713.288T21 17t-.288.713T20 18zm0-5q-.425 0-.712-.288T3 12t.288-.712T4 11h16q.425 0 .713.288T21 12t-.288.713T20 13zm0-5q-.425 0-.712-.288T3 7t.288-.712T4 6h16q.425 0 .713.288T21 7t-.288.713T20 8z"
                  strokeWidth="0.5"
                  stroke="currentColor"
                />
              </svg>
            </Navbar.Toggle>
            <Navbar.Brand href="#" className="flex items-center gap-2 me-0">
              <img
                src="https://raw.githubusercontent.com/hummingbirdui/hummingbird/c2a66a70db897fd0d89ea72e7cbab1d3c06a93e2/apps/docs/src/assets/images/logos/hb-logo1.svg"
                alt="Logo"
                className="size-10"
              />
              <Text
                as="h5"
                fontWeight="medium"
                className="text-white hidden sm:block"
              >
                hummingbird
              </Text>
            </Navbar.Brand>
          </div>
          <div className="lg:w-46.5 lg:order-1 text-end">
            <Button asChild className="rounded-full px-6">
              <a href="#">Sign Up</a>
            </Button>
          </div>
          <Navbar.Collapse className="py-6 lg:py-0 grow-0">
            <Navbar.Nav asChild className="lg:gap-8">
              <div>
                {navLinks.map((link, index) => (
                  <Nav.Link
                    key={link}
                    href="#"
                    active={index === 0}
                    className="text-white/70 active:text-white"
                  >
                    {link}
                  </Nav.Link>
                ))}
              </div>
            </Navbar.Nav>
          </Navbar.Collapse>
        </Navbar>
        <div className="max-w-3xl py-16">
          <Text as="h1" size="4xl" className="sm:text-6xl mb-6 text-white">
            Let&apos;s Explore Now
          </Text>
          <Text size="base" className="mb-10 text-white">
            A fast, reliable and easy way to search, compare and book flights,
            hotels, cars and vacation packages online. Get best deals on hotels,
            flights and car rentals from trusted travel providers worldwide.
          </Text>
          <form className="sm:flex items-center bg-white/16 p-4 border border-white/24 rounded-2xl">
            <div className="grid grid-cols-1 sm:grid-cols-3 w-full">
              <div className="max-sm:border-b max-sm:pb-4 max-sm:mb-6 sm:border-e border-white/24 sm:me-6 md:me-10">
                <Field.Label
                  htmlFor="hero-5-destination"
                  className="text-white"
                >
                  Where To?
                </Field.Label>
                <Input
                  id="hero-5-destination"
                  type="text"
                  className="px-0 border-0 bg-transparent focus:border-primary focus:ring-0 text-white"
                  placeholder="Destination"
                />
              </div>
              <div className="max-sm:border-b max-sm:pb-4 max-sm:mb-6 sm:border-e border-white/24 sm:me-6 md:me-10">
                <Field.Label htmlFor="hero-5-check-in" className="text-white">
                  Check-in Date
                </Field.Label>
                <InputIcon>
                  <InputIcon.Start
                    onClick={() => dateRef.current?.showPicker()}
                    className="text-white cursor-pointer inset-s-0"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1em"
                      height="1em"
                      viewBox="0 0 24 24"
                    >
                      <path d="M0 0h24v24H0z" fill="none" />
                      <path
                        fill="currentColor"
                        d="M5 22q-.825 0-1.412-.587T3 20V6q0-.825.588-1.412T5 4h1V3q0-.425.288-.712T7 2t.713.288T8 3v1h8V3q0-.425.288-.712T17 2t.713.288T18 3v1h1q.825 0 1.413.588T21 6v14q0 .825-.587 1.413T19 22zm0-2h14V10H5zM5 8h14V6H5zm0 0V6z"
                      />
                    </svg>
                  </InputIcon.Start>
                  <Input
                    ref={dateRef}
                    id="hero-5-check-in"
                    type="date"
                    onClick={(event) => event.currentTarget.showPicker()}
                    className="ps-6 pe-0 border-0 bg-transparent focus:border-primary focus:ring-0 text-white cursor-pointer [&::-webkit-calendar-picker-indicator]:hidden"
                    placeholder="MM/DD/YY"
                  />
                </InputIcon>
              </div>
              <div className="max-sm:border-b max-sm:pb-4 max-sm:mb-6 sm:border-e border-white/24 sm:me-6 md:me-10">
                <Field.Label className="text-white">
                  Number of Guests
                </Field.Label>
                <Dropdown>
                  <Dropdown.Trigger asChild>
                    <Button
                      variant="subtle"
                      color="neutral"
                      className="p-0 bg-transparent text-white py-1.75 font-normal"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1em"
                        height="1em"
                        viewBox="0 0 24 24"
                      >
                        <path d="M0 0h24v24H0z" fill="none" />
                        <path
                          fill="currentColor"
                          d="M1 17.2q0-.85.438-1.562T2.6 14.55q1.55-.775 3.15-1.162T9 13t3.25.388t3.15 1.162q.725.375 1.163 1.088T17 17.2v.8q0 .825-.587 1.413T15 20H3q-.825 0-1.412-.587T1 18zM21 20h-2.55q.275-.45.413-.962T19 18v-1q0-1.1-.612-2.113T16.65 13.15q1.275.15 2.4.513t2.1.887q.9.5 1.375 1.112T23 17v1q0 .825-.587 1.413T21 20M6.175 10.825Q5 9.65 5 8t1.175-2.825T9 4t2.825 1.175T13 8t-1.175 2.825T9 12t-2.825-1.175m11.65 0Q16.65 12 15 12q-.275 0-.7-.062t-.7-.138q.675-.8 1.038-1.775T15 8t-.362-2.025T13.6 4.2q.35-.125.7-.163T15 4q1.65 0 2.825 1.175T19 8t-1.175 2.825M3 18h12v-.8q0-.275-.137-.5t-.363-.35q-1.35-.675-2.725-1.012T9 15t-2.775.338T3.5 16.35q-.225.125-.363.35T3 17.2zm7.413-8.587Q11 8.825 11 8t-.587-1.412T9 6t-1.412.588T7 8t.588 1.413T9 10t1.413-.587M9 8"
                        />
                      </svg>
                      {guests}
                    </Button>
                  </Dropdown.Trigger>
                  <Dropdown.Content align="start">
                    {guestOptions.map((option) => (
                      <Dropdown.Item
                        key={option}
                        onSelect={() => setGuests(option)}
                      >
                        {option}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Content>
                </Dropdown>
              </div>
            </div>
            <Button type="submit" size="lg" className="w-30 px-2">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.125 17.0208L11.1042 12C10.6875 12.3611 10.2014 12.6423 9.64583 12.8437C9.09028 13.0451 8.5 13.1458 7.875 13.1458C6.375 13.1458 5.10417 12.625 4.0625 11.5833C3.02083 10.5416 2.5 9.28468 2.5 7.81246C2.5 6.34024 3.02083 5.08329 4.0625 4.04163C5.10417 2.99996 6.36806 2.47913 7.85417 2.47913C9.32639 2.47913 10.5799 2.99996 11.6146 4.04163C12.6493 5.08329 13.1667 6.34024 13.1667 7.81246C13.1667 8.40968 13.0694 8.98607 12.875 9.54163C12.6806 10.0972 12.3889 10.618 12 11.1041L17.0625 16.125C17.1875 16.2361 17.25 16.3784 17.25 16.552C17.25 16.7257 17.1806 16.8819 17.0417 17.0208C16.9167 17.1458 16.7639 17.2083 16.5833 17.2083C16.4028 17.2083 16.25 17.1458 16.125 17.0208ZM7.85417 11.8958C8.97917 11.8958 9.9375 11.4965 10.7292 10.6979C11.5208 9.89926 11.9167 8.93746 11.9167 7.81246C11.9167 6.68746 11.5208 5.72565 10.7292 4.92704C9.9375 4.12843 8.97917 3.72913 7.85417 3.72913C6.71528 3.72913 5.74653 4.12843 4.94792 4.92704C4.14931 5.72565 3.75 6.68746 3.75 7.81246C3.75 8.93746 4.14931 9.89926 4.94792 10.6979C5.74653 11.4965 6.71528 11.8958 7.85417 11.8958Z"
                  fill="currentColor"
                />
              </svg>
              Search
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
