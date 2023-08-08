class CreateQuestions < ActiveRecord::Migration[7.0]
  def change
    create_table :questions do |t|
      t.string :query
      t.string :option1
      t.string :option2
      t.string :option3
      t.string :answer

      t.timestamps
    end
  end
end
