class Note < ActiveRecord::Base
  validates :title, :notebook_id, presence: true

  belongs_to :notebook
  has_many :taggings
  has_many :tags, through: :taggings

  default_scope { order('created_at DESC')}
end