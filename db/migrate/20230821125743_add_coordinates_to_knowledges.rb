class AddCoordinatesToKnowledges < ActiveRecord::Migration[7.0]
  def change
    add_column :knowledges, :X, :string
    add_column :knowledges, :integer, :string
    add_column :knowledges, :y, :integer
  end
end
