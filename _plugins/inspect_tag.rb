require 'pp'

module Jekyll
  class InspectTag < Liquid::Tag
    def initialize(tag_name, text, tokens)
      super
      if !text.empty? then
        @key = text.to_sym
      end
    end
    def render(context)
      var = context.registers
      if @key then
        var = var[@key]
      end
      return var.pretty_print_inspect
    end
  end
end

Liquid::Template.register_tag 'inspect', Jekyll::InspectTag
