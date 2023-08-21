class UsersSerializer < ActiveModel::Serializer
  attributes :id, :username, :password, :emailaddress, :dateofbirth, :total_points_count, :last_gem_bonus, :last_daily_bonus

  has_many :points
  has_many :questions, through: :points

end
