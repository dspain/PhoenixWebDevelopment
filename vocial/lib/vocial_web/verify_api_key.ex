defmodule VocialWeb.VerifyApiKey do
  import Plug.Conn, only: [halt: 1, put_status: 2]
  import Phoenix.Controller, only: [render: 3]

  alias Vocial.Accounts

  def init(opts), do: opts

  def call(conn, _opts) do
    conn
    |> put_status(401)
    |> render(VocialWeb.ErrorView, "invalid_api_key.json")
    |> halt()
  end

  def fetch_authorization_header(conn) do
    conn.req_headers
    |> Enum.into(%{})
    |> Map.fetch("authorization")
  end

  def decode_authorization_header(auth_header) do
    [type, key] = String.split(auth_header, " ")

    case String.downcase(type) do
      "basic" -> Base.decode64(key)
      _ -> {:error, "Invalid Authorization Header Format"}
    end
  end
end
