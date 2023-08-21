class CreateRecyclelogs < ActiveRecord::Migration[7.0]
  def change
    create_table :recyclelogs do |t|
      t.integer :user_id
      t.date :date
      t.integer :amount

      t.timestamps
    end
  end
end
