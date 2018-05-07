class Api::V1::SongsController < ApplicationController
  before_action :set_song, only: [:show,:update,:destroy]

  def index
    songs = Song.all
    render json: songs, status: 200
  end

  def create
    song = Song.create(song_params)
    render json: song, status: 201
  end

  def update
    @song.update(song_params)
    render json: @song, status: 200
  end

  def destroy
    songId = @song.id
    @song.destroy
    render json: {message:"Zap! song deleted", songId:songId}
  end

  def show
    render json: @song, status: 200
  end

  private
  def song_params
    params.permit(:name, :duration)
  end

  def set_params
    @song = Song.find(params[:id])
  end
end
