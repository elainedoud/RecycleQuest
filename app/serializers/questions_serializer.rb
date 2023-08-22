class QuestionsSerializer < ActiveModel::Serializer
  attributes :id, :query, :A, :B, :C, :answer

  has_many :points 
  has_many :users, through: :points
end
