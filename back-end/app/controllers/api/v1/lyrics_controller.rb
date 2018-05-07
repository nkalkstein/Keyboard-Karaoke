class Api::V1::LyricsController < ApplicationController
  before_action :set_lyric, only: [:show,:update,:destroy]

  def index
    lyrics = Lyric.all
    render json: lyrics, status: 200
  end

  def create
    lyric = Lyric.create(lyric_params)
    render json: lyric, status: 201
  end

  def update
    @lyric.update(lyric_params)
    render json: @lyric, status: 200
  end

  def destroy
    lyricId = @lyric.id
    @lyric.destroy
    render json: {message:"Zap! Lyric deleted", lyricId:lyricId}
  end

  def show
    render json: @lyric, status: 200
  end

  private
  def lyric_params
    params.permit(:song_id, :start, :duration, :content)
  end

  def set_lyric
    @lyric = Lyric.find(params[:id])
  end
end
