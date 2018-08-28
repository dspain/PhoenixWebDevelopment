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

  def write(topic, username, status) do
    row = %{
      topic: topic,
      username: username,
      status: status,
      timestamp: DateTime.utc_now()
    }

    GenServer.cast(__MODULE__, {:write, row})
  end

  def lookup do
    GenServer.call(__MODULE__, {:lookup})
  end
end
