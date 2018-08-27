defmodule Vocial.ChatCache do
  use GenServer

  @table :presence
  @key :statuses

  def start_link do
    GenServer.start_link(__MODULE__, [], name: __MODULE__)
  end

  def init(_) do
    table = :ets.new(@table, [:bag])
    {:ok, %{table: table}}
  end
end
