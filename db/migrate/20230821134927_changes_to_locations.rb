class ChangesToLocations < ActiveRecord::Migration[7.0]
  def change
    remove_column :locations, :recyclable_items

    add_column :locations, :accepted_recyclables, :string
    add_column :locations, :created_by, :string
    add_column :locations, :zipcode, :string
  end
end
