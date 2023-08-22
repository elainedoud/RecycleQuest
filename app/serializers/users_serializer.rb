class UsersSerializer < ActiveModel::Serializer
  attributes :id, :username, :password, :emailaddress, :dateofbirth, :total_points_count, :last_gem_bonus, :last_daily_bonus, :last_daily_question

  has_many :points
  has_many :questions, through: :points

  has_many :recyclelogs

end
