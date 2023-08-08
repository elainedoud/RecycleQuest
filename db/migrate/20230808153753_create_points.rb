class CreatePoints < ActiveRecord::Migration[7.0]
  def change
    create_table :points do |t|
      t.integer :user_id
      t.integer :question_id
      t.integer :amount

      t.timestamps
    end
  end
end
