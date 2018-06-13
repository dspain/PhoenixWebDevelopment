defmodule VocialWeb.UserControllerTest do
  use VocialWeb.ConnCase

  test "GET /users/new", %{conn: conn} do
    conn = get(conn, "/users/new")
    assert html_response(conn, 200) =~ "User Signup"
  end

  test "GET /users/:id", %{conn: conn} do
    conn = get(conn, "/users/1")
    assert html_response(conn, 200)
  end

  test "POST /users", %{conn: conn} do
    conn = post(conn, "/users")
    assert html_response(conn, 200)
  end
end
