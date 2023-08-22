class AddChangeToUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :last_daily_question, :datetime
  end
end
