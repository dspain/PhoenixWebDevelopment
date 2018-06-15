defmodule VocialWeb.SessionController do
  use VocialWeb, :controller

  def new(conn, _params) do
    render(conn, "new.html")
  end

  def delete(conn, _params) do
    conn
    |> delete_session(:user)
    |> put_flash(:info, "Logged out successfully!")
    |> redirect(to: "/")
  end

  def create(conn, _params), do: conn
end
