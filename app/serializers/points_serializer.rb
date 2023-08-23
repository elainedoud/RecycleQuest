class PointsSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :points_type, :points_count, :date

  belongs_to :question
  belongs_to :user

end
