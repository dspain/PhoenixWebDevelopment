defmodule VocialWeb.Api.PollView do
  use VocialWeb, :view

  def render("index.json", _data) do
    %{
      message: "Hello World"
    }
  end
end
