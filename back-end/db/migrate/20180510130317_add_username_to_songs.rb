class AddUsernameToSongs < ActiveRecord::Migration[5.1]
  def change
    add_column :songs, :username, :string
  end
end
