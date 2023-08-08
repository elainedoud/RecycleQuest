class CreateKnowledges < ActiveRecord::Migration[7.0]
  def change
    create_table :knowledges do |t|
      t.string :character_name
      t.string :knowledge_blurb
      t.string :string

      t.timestamps
    end
  end
end
