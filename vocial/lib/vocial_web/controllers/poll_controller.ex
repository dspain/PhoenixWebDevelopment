defmodule VocialWeb.PollController do
  use VocialWeb, :controller

  def index(conn, _params) do
    polls = Vocial.Votes.list_polls()
    render(conn, "index.html", polls: polls)
  end

  def new(conn, _params) do
    poll = Vocial.Votes.new_poll()
    render(conn, "new.html", poll: poll)
  end
end
