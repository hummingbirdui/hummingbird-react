"use client";

import { Calendar, Menu, Search, Users } from "lucide-react";
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
              <Menu className="size-4.5" />
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
                    <Calendar className="size-4" />
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
                      <Users className="size-3.5" />
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
              <Search className="size-5" />
              Search
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
