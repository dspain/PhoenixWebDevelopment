defmodule VocialWeb.VerifyApiKey do
  import Plug.Conn, only: [halt: 1, put_status: 2]
  import Phoenix.Controller, only: [render: 3]

  def init(opts), do: opts

  def call(conn, _opts) do
    conn
    |> put_status(401)
    |> render(VocialWeb.ErrorView, "invalid_api_key.json")
    |> halt()
  end
end
