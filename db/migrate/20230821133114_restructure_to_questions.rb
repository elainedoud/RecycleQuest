class RestructureToQuestions < ActiveRecord::Migration[7.0]
  def change
    remove_column :questions, :option1
    remove_column :questions, :option2
    remove_column :questions, :option3

    add_column :questions, :A, :string
    add_column :questions, :B, :string
    add_column :questions, :C, :string
  end
end
