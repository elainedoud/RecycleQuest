class PointsSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :question_id, :amount

  belongs_to :question
  belongs_to :user

end
