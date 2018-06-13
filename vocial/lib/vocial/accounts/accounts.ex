defmodule Vocial.Accounts do
  import Ecto.Query, warn: false

  alias Vocial.Repo
  alias Vocial.Accounts.User

  def list_users, do: Repo.all(User)
end
