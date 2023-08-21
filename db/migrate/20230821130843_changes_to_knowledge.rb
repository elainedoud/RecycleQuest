class ChangesToKnowledge < ActiveRecord::Migration[7.0]
  def change
    remove_column :knowledges, :X, :string
    remove_column :knowledges, :string, :string
    remove_column :knowledges, :integer, :string
    add_column :knowledges, :x, :integer
  end
end
