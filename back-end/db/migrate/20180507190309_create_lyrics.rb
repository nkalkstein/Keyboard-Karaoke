class CreateLyrics < ActiveRecord::Migration[5.1]
  def change
    create_table :lyrics do |t|
      t.integer :song_id
      t.float :start
      t.float :duration
      t.string :content

      t.timestamps
    end
  end
end
