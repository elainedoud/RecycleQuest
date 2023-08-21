class ChangesToUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :total_points_count, :integer
    add_column :users, :last_gem_bonus, :datetime
    add_column :users, :last_daily_bonus, :datetime
  end
end
