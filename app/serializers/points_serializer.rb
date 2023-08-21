class PointsSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :points_type, :points_count, :date

  belongs_to :question
  belongs_to :user
  attr_accessor :user_name

  def user_name
    self.user.username
  end

end
