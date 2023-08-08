class QuestionsSerializer < ActiveModel::Serializer
  attributes :id, :query, :option1, :option2, :option3, :answer

  has_many :points 
  has_many :users, through: :points
end
