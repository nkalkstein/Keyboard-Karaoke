class AddScoresToSongs < ActiveRecord::Migration[5.1]
  def change
    add_column :songs, :score, :integer
  end
end
