defmodule VocialWeb.UserController do
  use VocialWeb, :controller

  alias Vocial.Accounts

  def new(conn, _params) do
    user = Accounts.new_user()
    render(conn, "new.html", user: user)
  end

  def create(conn, _params) do
    conn
  end

  def show(conn, _params) do
    conn
  end
end
