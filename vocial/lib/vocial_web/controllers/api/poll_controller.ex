defmodule VocialWeb.Api.PollController do
  use VocialWeb, :controller

  alias Vocial.Votes

  def index(conn, _params) do
    polls = Votes.list_most_recent_polls()
    render(conn, "index.json", polls: polls)
  end

  def show(conn, %{"id" => id}) do
    poll = Votes.get_poll(id)
    render(conn, "show.json", poll: poll)
  end
end
