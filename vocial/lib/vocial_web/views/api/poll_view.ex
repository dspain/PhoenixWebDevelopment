defmodule VocialWeb.Api.PollView do
  use VocialWeb, :view

  def render("index.json", %{polls: polls}) do
    %{
      polls: render_many(polls)
    }
  end

  def render("index.json", _data) do
    %{
      message: "Hello World"
    }
  end

  def render_one(poll) do
    %{
      id: poll.id,
      title: poll.title,
      options: Enum.map(poll.options, fn o -> Map.take(o, [:title, :votes]) end),
      image: %{
        url: poll.image.url,
        alt: poll.image.alt,
        caption: poll.image.caption
      }
    }
  end

  def render_many(polls) do
    Enum.map(polls, &render_one/1)
  end
end
