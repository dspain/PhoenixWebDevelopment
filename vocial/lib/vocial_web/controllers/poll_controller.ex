defmodule VocialWeb.PollController do
  use VocialWeb, :controller

  def index(conn, _params) do
    conn
    |> put_layout(:special)
    |> render("index.html")
  end
end
