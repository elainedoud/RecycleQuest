class ChangesToPoints < ActiveRecord::Migration[7.0]
  def change
    remove_column :points, :amount

    add_column :points, :points_type, :string
    add_column :points, :points_count, :integer
    add_column :points, :date, :date 

  end
end
