defmodule VocialWeb.Api.PollController do
  use VocialWeb, :controller

  def index(conn, _params) do
    render(conn, "index.json", [])
  end
end
