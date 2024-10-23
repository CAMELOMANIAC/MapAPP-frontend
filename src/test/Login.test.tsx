import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import BottomButtonLayout from "../components/BottomButtonLayout";

test("아이디 인풋 태그 라벨 렌더링", async () => {
  render(
    <MemoryRouter initialEntries={["/"]}>
      <Routes>
        <Route path="/" element={<BottomButtonLayout />}>
          <Route index element={<Login />} />
        </Route>
      </Routes>
    </MemoryRouter>
  );
  const linkElement = screen.getByLabelText(/아이디/i);
  expect(linkElement).toBeInTheDocument();
  const inputElement = screen.getByRole("textbox", { name: /아이디/i });
  expect(inputElement).toBeInTheDocument();
});
