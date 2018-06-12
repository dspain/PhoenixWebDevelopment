defmodule VocialWeb.PollController do
  use VocialWeb, :controller

  def index(conn, _params) do
    polls = Vocial.Votes.list_polls()

    conn
    |> put_layout(:special)
    |> render("index.html", polls: polls)
  end

  def new(conn, _params) do
    poll = Vocial.Votes.new_poll()

    conn
    |> put_layout("special.html")
    |> render("new.html", poll: poll)
  end
end
